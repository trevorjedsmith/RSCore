using System;
using System.Collections.Generic;
using System.Text;
using RSCore.Data.Abstract;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace RSCore.Data.Concrete
{
    public class EntityRepository<T> : IEntityRepository<T> where T : class
    {
        private DbSet<T> DbSet { get; set; }
        public IDbSession DbSession { get; private set; }

        public EntityRepository(IDbSession session)
        {
            if (session == null)
            {
                throw new ArgumentNullException(nameof(session));
            }

            DbSession = session;
            DbSet = session.Current.GetDbSet<T>();
        }

        public void Add(T entity)
        {
            EntityEntry entry = ((DbContext)DbSession.Current).Entry(entity);
            if (entry.State != EntityState.Detached)
            {
                entry.State = EntityState.Added;
            }
            else
            {
                this.DbSet.Add(entity);
            }
        }

        public void Commit()
        {
            DbSession.SaveChanges();
        }

        public void Delete(T entity)
        {
            EntityEntry entry = ((DbContext)DbSession.Current).Entry(entity);

            if (entry.State != EntityState.Deleted)
            {
                entry.State = EntityState.Deleted;
            }
            else
            {
                this.DbSet.Attach(entity);
                this.DbSet.Remove(entity);
            }
        }

        public void Delete(int id)
        {
            var entity = this.GetById(id);

            if (entity != null)
            {
                this.Delete(entity);
            }
        }

        public void Detach(T entity)
        {
            EntityEntry entry = ((DbContext)DbSession.Current).Entry(entity);

            entry.State = EntityState.Detached;
        }

        public IQueryable<T> Get(Expression<Func<T, bool>> predicate)
        {
            return this.DbSet.Where(predicate);
        }

        public IQueryable<T> GetAll()
        {
            return this.DbSet;
        }

        public T GetById(int id)
        {
            return this.DbSet.Find(id);
        }

        public void Update(T entity)
        {
            EntityEntry entry = ((DbContext)DbSession.Current).Entry(entity);

            if (entry.State == EntityState.Detached)
            {
                this.DbSet.Attach(entity);
            }

            entry.State = EntityState.Modified;
        }

    }
}
