// $(document).ready(function() {
//     $('#submitBtn').click(function(e) {
//         e.preventDefault();
//         var name = $('#obj').val();
//         $.ajax({
//             url: '/submited',
//             type: 'POST',
//             data: {obj: name},
//             success: function(response) {
//                 if (response.status === 'success') {
//                     // Handle success
//                     console.log('Data submitted successfully');
//                 } else {
//                     // Handle error
//                     console.error('Error submitting data');
//                 }
//             },
//             error: function(xhr, status, error) {
//                 console.error('Error:', error);
//             }
//         });
//     });
// });

// // Function to generate URLs

// function generateUrls(name) {
//     var flipkart_url = "https://www.flipkart.com/search?q=" + name;
//     var amazon_url = "https://www.amazon.in/s?k=" + name;
//     var meesho_url = "https://www.meesho.com/search?q=" + name;
//     var myntra_url = "https://www.myntra.com/" + name;
//     var shopclues_url = "https://www.shopclues.com/search?q=" + name;
//     var ajio_url = "https://www.ajio.com/search/?text=" + name;
//     var tatacliq_url = "https://www.tatacliq.com/search/?searchCategory=all&text=" + name;
//     var snapdeal_url = "https://www.snapdeal.com/search?keyword=" + name;
//     var jiomart_url = "https://www.jiomart.com/search/" + name;
//     var nykaa_url = "https://www.nykaa.com/search/result/?q=" + name;
//     var paytm_mall_url = "https://paytmmall.com/shop/search?q=" + name;
//     var big_basket_url = "https://www.bigbasket.com/ps/?q=" + name;
//     var purple_url = "https://www.purplle.com/search?q=" + name;

//     return {
//         flipkart_url: flipkart_url,
//         amazon_url: amazon_url,
//         meesho_url: meesho_url,
//         myntra_url: myntra_url,
//         shopclues_url: shopclues_url,
//         ajio_url: ajio_url,
//         tatacliq_url: tatacliq_url,
//         snapdeal_url: snapdeal_url,
//         jiomart_url: jiomart_url,
//         nykaa_url: nykaa_url,
//         paytm_mall_url: paytm_mall_url,
//         big_basket_url: big_basket_url,
//         purple_url: purple_url
//     };
// }