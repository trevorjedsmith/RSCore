using Microsoft.EntityFrameworkCore;
using RSCore.Models;
using System;


namespace RSCore.Data.Abstract
{
    public interface IDbContext : IDisposable
    {
        DbSet<TEntity> GetDbSet<TEntity>() where TEntity : class;

        DbSet<Product> Products { get; set; }

        DbSet<LogEntry> LogEntries { get; set; }

    }
}
