#All the code in this file before Save In Links was taken from
#trishume's wikicrush code.

require "sqlite3"
require 'multi_json'
require 'pry'

class File
  def each_chunk(chunk_size=1024*1024)
    yield read(chunk_size) until eof?
  end
end

class Graph
  HEADER_SIZE = 4
  def initialize(f,db_path, dbg = true)
    @debug = dbg
    debug "loading file"
    @d = []
    f.each_chunk do |chunk|
      @d.concat(chunk.unpack("L*"))
    end
    @db = SQLite3::Database.new db_path
  end

  def at(page,i)
    @d[page/4+i]
  end

  def link_count(page)
    at(page,1)
  end

  def bi_link_count(page)
    at(page,2)
  end

  def meta(page)
    at(page,3)
  end

  def page_links(page)
    x = page/4
    c = @d[x+1] # link count
    # print ("x:#{x}, c:#{c}, p:#{p}, HEADER_SIZE:#{HEADER_SIZE}")
    @d[x+HEADER_SIZE..x+HEADER_SIZE+c-1]
  end

  def page_bi_links(page)
    x = page/4
    c = @d[x+2] # bi link count
    @d[x+HEADER_SIZE..x+HEADER_SIZE+c-1]
  end

  def page_un_links(page)
    x = page/4
    b = @d[x+2] # bi link count
    c = @d[x+1] # bi link count
    @d[x+HEADER_SIZE+b..x+HEADER_SIZE+c-1]
  end

  def name(page)
    rs = @db.execute("SELECT title FROM pages WHERE offset = ? LIMIT 1",page)
    return nil if rs.empty?
    rs.first.first
  end

  def find(s)
    rs = @db.execute("SELECT offset FROM pages WHERE title = ? LIMIT 1",s)
    return nil if rs.empty?
    rs.first.first
  end


  def save_in_links
    #creates a hash where a key is the offset of a page and the value
    #is an array of offsets of pages linking to this page
    #stores this hash as a txt file
    in_links = {}
    #using Sqlite3 in the short run, will switch to postgres in the near
    #future
    page_offsets = @db.execute("SELECT offset FROM pages")
    page_offsets.each_with_index do |offset, idx|
      offset_int = offset[0]
      puts idx if idx % 10000 == 0
      page_links(offset_int).each do |out_link|
        if in_links[out_link]
          in_links[out_link] << offset_int
        else
          in_links[out_link] = [offset_int]
        end
      end
    end
    File.open('in_links.txt','w') do |f|
      f.write(MultiJson.dump(in_links))
    end
  end

  def save_num_out_links
    #creates a hash where a key is a page's offset and each value is
    #the number of pages it links to
    #saves as num_out_links.txt
    page_offsets = @db.execute("SELECT offset FROM pages")
    num_out_links = {}
    page_offsets.each do |offset|
      offset_int = offset[0]
      num_out_links[offset_int] = link_count(offset_int)
    end
    File.open('num_out_links.txt', 'w') do |f|
      f.write(MultiJson.dump(num_out_links))
    end
  end

  def get_page_ranks(num_iters, page_ranks=nil)
    #creates a hash where the keys are offsets of a page and the values
    #are the pages' pageranks
    #runs an arbitrary number of times
    damping_factor = 0.85
    in_links = load_in_links
    num_out_links = load_num_out_links
    page_offsets = @db.execute("SELECT offset FROM pages")
    num_pages = @db.execute("SELECT COUNT(*) FROM pages")[0]
    initial_val = 1.to_f / num_pages[0]
    page_ranks ||= Hash.new(initial_val)
    num_iters.times do |i|
      puts "iteration #{i+1} of #{num_iters}"
      new_ranks = {}
      page_offsets.each_with_index do |page, idx|
        page_key = page[0].to_s
        rank = 0
        # puts("idx: #{idx}, type(page_key): #{} page_key: #{page_key}, in_links[page_key], #{in_links[page_key]}")
        if in_links[page_key]
          # puts "page #{page_key} has links #{in_links}"
          in_links[page_key].each do |in_link|
            in_link_key = in_link.to_s
            rank += page_ranks[in_link_key] / num_out_links[in_link_key]
          end
        end
        rank = (1 - damping_factor)*initial_val + (damping_factor * rank)
        if idx % 10000 == 0
          puts("idx: #{idx}, page: #{page}, old ranks: #{page_ranks[page_key]}, new_rank: #{rank}")
        end
        new_ranks[page_key] = rank
      end
      page_ranks = new_ranks
    end

    File.open('page_ranks.txt', 'w') do |f|
      f.write(MultiJson.dump(page_ranks))
    end
  end

  def load_in_links
    puts "Loading in_links..."
    f = File.open('in_links.txt')
    in_links = MultiJson.load(f)
    f.close
    puts "Loaded in_links"
    in_links
  end

  def load_num_out_links
    puts "Loading num_out_links..."
    f = File.open('num_out_links.txt')
    num_out_links = MultiJson.load(f)
    f.close
    puts "Loaded num_out_links"
    num_out_links
  end

  private

  def debug(msg)
    STDERR.puts msg if @debug
  end
end
