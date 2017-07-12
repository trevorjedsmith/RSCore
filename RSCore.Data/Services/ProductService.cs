using RSCore.Data.Interfaces;
using System;
using System.Collections.Generic;
using System.Text;
using RSCore.Models;
using System.Linq;
using RSCore.Data.Abstract;

namespace RSCore.Data.Services
{
    public class ProductService : IProductService
    {
        private IEntityRepository<Product> _productsRepository;

        public ProductService(IEntityRepository<Product> productsRepository)
        {
            _productsRepository = productsRepository;
        }
        public void Add(Product product)
        {
            _productsRepository.Add(product);
        }

        public void Delete(Product product)
        {
            _productsRepository.Delete(product);
        }

        public void Delete(int id)
        {
            _productsRepository.Delete(id);
        }

        public IQueryable<Product> GetAllProducts()
        {
            return _productsRepository.GetAll();
        }

        public Product GetProduct(int id)
        {
            return _productsRepository.GetById(id);
        }

        public void SaveChanges()
        {
            _productsRepository.Commit();
        }

        public void Update(Product product)
        {
            _productsRepository.Update(product);
        }
    }
}
