using Microsoft.EntityFrameworkCore;
using RSCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RSCore.Data
{
    public class RSCoreDbContext : DbContext
    {
        public RSCoreDbContext(DbContextOptions<RSCoreDbContext> options) : base(options)
        {}

        public DbSet<Product> Products { get; set; }
    }
}
