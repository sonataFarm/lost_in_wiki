class CreatePages < ActiveRecord::Migration[5.1]
  def change
    create_table :pages do |t|
      t.string :title, null: false
      t.float :page_rank
      t.timestamps
    end
    add_index :pages, :title, unique: true
  end
end
