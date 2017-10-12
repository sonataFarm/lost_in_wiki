### To set up Production DB
* If in_links.txt, num_out_links.txt, page_ranks.txt do not exist
  * Open ```wikidata/analyze/graph.rb``` and run ```save_in_links```
  * run ```save_num_out_links ```
  * run ```get_page_ranks``` with some number of iterations, 10 should
    be more than enough
  * run the production db seed
  * to prune meta-pages (such as categories), run ```Page.delete_meta_pages```
  * voila
  * yeah i know this isn't optimized
