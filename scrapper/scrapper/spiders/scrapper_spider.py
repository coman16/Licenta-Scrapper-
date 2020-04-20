import scrapy
from ..items import ScrapperItem

class ScrapperSpider(scrapy.Spider):
    name = "scrapper"
    page_number = 2
    start_urls = [
        'https://www.emag.ro/telefoane-mobile/c?tree_ref=13&ref=cat_tree_93'
    ]

    def parse(self, response):
        item = ScrapperItem()
        all_items = response.css('.js-product-data')
        for scrap in all_items:
            product_name = scrap.css('.product-title').css('::text').extract()
            product_price = scrap.css('.product-new-price::text').extract()
            product_imagelink = scrap.css('.lozad::attr(src)').extract()

            item['product_name'] = product_name
            item['product_price'] = product_price
            item['product_imagelink'] = product_imagelink

            yield item

        # next_page = 'https://www.emag.ro/telefoane-mobile/p'+ str(ScrapperSpider.page_number) +'/c'
        # if ScrapperSpider.page_number <= 32:
        #     # ScrapperSpider.page_number += 1
        #     yield response.follow(next_page,callback = self.parse)