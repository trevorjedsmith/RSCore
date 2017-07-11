using Microsoft.EntityFrameworkCore;
using RSCore.Data.Abstract;
using System;
using System.Collections.Generic;
using System.Text;

namespace RSCore.Data.Concrete
{
    public class DbSession : IDbSession
    {
        private IDbContext _context;

        public DbSession(IDbContext context)
        {
            _context = context;
        }

        public IDbContext Current
        {
            get
            {
                return this._context;
            }
        }

        public int SaveChanges()
        {
            return ((DbContext)Current).SaveChanges();
        }
    }
}
