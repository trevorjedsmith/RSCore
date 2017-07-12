using Microsoft.EntityFrameworkCore;
using RSCore.Data.Abstract;
using RSCore.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace RSCore.Data
{
    public class RSCoreDbContext : DbContext, IDbContext
    {
        public RSCoreDbContext(DbContextOptions<RSCoreDbContext> options) : base(options)
        {}

        public DbSet<Product> Products { get; set; }

        public DbSet<LogEntry> LogEntries { get; set; }

        public DbSet<Logger> Logger { get; set; }

        public DbSet<TEntity> GetDbSet<TEntity>() where TEntity : class
        {
            return Set<TEntity>();
        }
    }
}
