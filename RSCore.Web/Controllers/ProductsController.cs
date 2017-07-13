using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RSCore.Data.Interfaces;
using RSCore.Models;
using RSCore.Web.Helpers.Abstract;
using RSCore.Models.Enums;

namespace RSCore.Web.Controllers
{
    /// <summary>
    /// ProductsController gets all ficticous products
    /// </summary>
    [Produces("application/json")]
    [Route("api/Products")]
    public class ProductsController : Controller
    {
        private IProductService _productService;
        private IExceptionUtility _exceptionUtility;

        /// <summary>
        /// ProductsController constuctor
        /// </summary>
        /// <param name="productService"></param>
        /// <param name="exceptionUtility"></param>
        public ProductsController(IProductService productService, IExceptionUtility exceptionUtility)
        {
            _productService = productService;
            _exceptionUtility = exceptionUtility;
        }

        // GET: api/Products
        /// <summary>
        /// get all products from repository
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_productService.GetAllProducts().ToList());
            }
            catch(Exception ex)
            {
                _exceptionUtility.LogException(ex, User.Identity.Name, LogLevel.ERROR);
                return StatusCode(500, "A problem occured while handling your request.");
            }
        }

        // GET: api/Products/5
        /// <summary>
        /// get a product with id from repository
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpGet("{productId}", Name = "Get")]
        public IActionResult Get(int productId)
        {
            try
            {
                var product = _productService.GetProduct(productId);

                if (product == null)
                    return NotFound();

                return Ok(product);
            }
            catch (Exception ex)
            {
                _exceptionUtility.LogException(ex, User.Identity.Name, LogLevel.ERROR);
                return StatusCode(500, "A problem occured while handling your request.");
            }
        }
        
        // POST: api/Products
        /// <summary>
        /// add product to repository
        /// </summary>
        /// <param name="product"></param>
        /// <returns></returns>
        [HttpPost("",Name = "CreateProduct")]
        public IActionResult Post([FromBody]Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _productService.Add(product);
                _productService.SaveChanges();
                return CreatedAtRoute("CreateProduct", new { id = product.ProductID }, product);
            }
            catch (Exception ex)
            {
                _exceptionUtility.LogException(ex, User.Identity.Name, LogLevel.ERROR);
                return StatusCode(500, "A problem occured while handling your request.");
            }

        }

        // PUT: api/Products/5
        /// <summary>
        /// update product in repository
        /// </summary>
        /// <param name="productId"></param>
        /// <param name="product"></param>
        /// <returns></returns>
        [HttpPut("{productId}")]
        public IActionResult Put(int productId, [FromBody]Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(productId != product.ProductID)
            {
                return BadRequest(new { Error = "Product Id has been altered" });
            }

            try
            {
                _productService.Update(product);
                _productService.SaveChanges();
                return Ok(product);
            }
            catch (Exception ex)
            {
                _exceptionUtility.LogException(ex, User.Identity.Name, LogLevel.ERROR);
                return StatusCode(500, "A problem occured while handling your request.");
            }

        }

        // DELETE: api/Products/5
        /// <summary>
        /// delete product from repository
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        [HttpDelete("{productId}")]
        public IActionResult Delete(int productId)
        {
            try
            {
                var product = _productService.GetProduct(productId);

                if (product == null)
                    return NotFound();

                _productService.Delete(product);
                _productService.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                _exceptionUtility.LogException(ex, User.Identity.Name, LogLevel.ERROR);
                return StatusCode(500, "A problem occured while handling your request.");
            }
        }
    }
}
