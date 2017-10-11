require_relative "#{Rails.root}/db/wikidata/analyze/graph.rb"
require 'sqlite3'
require 'multi_json'

#these methods turn the existing sqlite3 and JSON data into seeds
#for the postgres db


class SeedUtil
  include Singleton

  def load_page_ranks
    page_ranks_txt = File.open("#{Rails.root}/db/wikidata/page_ranks.txt")
    page_ranks = MultiJson.load(page_ranks_txt)
    page_ranks_txt.close
    page_ranks
  end

  def generate_seeds
    page_ranks = load_page_ranks
    pages = load_pages
    pages.each_with_index do |page, idx|
      title, offset = page[0], page[1]
      page_rank = page_ranks[offset.to_s]
      newPage = Page.new(title: title, page_rank: page_rank)
      unless newPage.save
        puts "Page didn't save for some gorram reason"
      end
      puts "Loaded page #{idx}" if idx % 10000 == 0
    end
  end

end
