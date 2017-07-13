using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace RSCore.Models
{
    public class Product
    {
        public int ProductID { get; set; }
        [Required(ErrorMessage ="Please enter a name")]
        [StringLength(50, ErrorMessage = "The max characters is 50")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Please enter a description")]
        [StringLength(50, ErrorMessage = "The max characters is 50")]
        public string Description { get; set; }
        [Required(ErrorMessage ="Please enter a price")]
        [Range(0.01,100000.00,ErrorMessage ="Please enter a value between 0.01 and 100000")]
        public decimal Price { get; set; }
        [Required(ErrorMessage = "Please enter a category")]
        [StringLength(50,ErrorMessage ="The max characters is 50")]
        public string Category { get; set; }
    }
}
