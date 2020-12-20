var d3 = require("d3");
const StockXAPI = require('stockx-api');
const stockX = new StockXAPI({
    proxy: '66.128.205.58:59618:leaf:Evz3sBQ6',
    currency: 'USD',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0 Mobile/15E148 Safari/604.1'
});

var search  = d3.select("#search-btn");

stockX.newSearchProducts(search, {
    limit: 5
})
.then(products => console.log(products))
.catch(err => console.log(`Error searching: ${err.message}`));