class Page < ApplicationRecord

  def self.delete_meta_pages
      #destroys all pages that begin with Category:, Wikipedia:,
      #MediaWiki: or contain (disambiguation)
      Page.delete(Page.where("
        title SIMILAR TO
          '(Wikipedia\:|Category\:|MediaWiki\:|Portal\:)%'
        OR title SIMILAR TO '%disambiguation%'")
        .map {|page| page.id})
  end
end
