using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using RSCore.Data.Interfaces;
using RSCore.Web.Models;
using RSCore.Models;


namespace RSCore.Web.Controllers
{
    [Produces("application/json")]
    [Route("api/Products")]
    public class ProductsController : Controller
    {
        private IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        // GET: api/Products
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_productService.GetAllProducts().ToList());
            }
            catch(Exception ex)
            {
                //Log 
                Log4NetHelper.Log(String.Format("There has been an exception {0}.", ex.Message), LogLevel.ERROR, "ProductsController", 0, User.Identity.Name, ex);
                return BadRequest(new { Error = ex.Message });
            }
        }

        // GET: api/Products/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            try
            {
                var product = _productService.GetProduct(id);

                if (product == null)
                    return NotFound();

                return Ok(product);
            }
            catch (Exception ex)
            {
                //Log 
                Log4NetHelper.Log(String.Format("There has been an exception {0}.", ex.Message), LogLevel.ERROR, "ProductsController", 0, User.Identity.Name, ex);
                return BadRequest(new { Error = ex.Message });
            }
        }
        
        // POST: api/Products
        [HttpPost]
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
                return Created(string.Format("api/products/{0}", product.ProductID), product);
            }
            catch (Exception ex)
            {
                //Log 
                Log4NetHelper.Log(String.Format("There has been an exception {0}.", ex.Message), LogLevel.ERROR, "ProductsController", 0, User.Identity.Name, ex);
                return BadRequest(new { Error = ex.Message });
            }

        }
        
        // PUT: api/Products/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]Product product)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if(id != product.ProductID)
            {
                return BadRequest(new { Error = "Product Id has been altered" });
            }

            try
            {
                _productService.Update(product);
                _productService.SaveChanges();
                return Ok();
            }
            catch (Exception ex)
            {
                //Log 
                Log4NetHelper.Log(String.Format("There has been an exception {0}.", ex.Message), LogLevel.ERROR, "ProductsController", 0, User.Identity.Name, ex);
                return BadRequest(new { Error = ex.Message });
            }

        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                var product = _productService.GetProduct(id);

                if (product == null)
                    return NotFound();

                return Ok();
            }
            catch (Exception ex)
            {
                //Log 
                Log4NetHelper.Log(String.Format("There has been an exception {0}.", ex.Message), LogLevel.ERROR, "ProductsController", 0, User.Identity.Name, ex);
                return BadRequest(new { Error = ex.Message });
            }
        }
    }
}
