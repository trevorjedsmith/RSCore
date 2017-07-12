using RSCore.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace RSCore.Data.Interfaces
{
    public interface IProductService
    {
        IQueryable<Product> GetAllProducts();

        Product GetProduct(int id);

        void Add(Product product);

        void Update(Product product);

        void Delete(Product product);

        void Delete(int id);

        void SaveChanges();
    }
}
