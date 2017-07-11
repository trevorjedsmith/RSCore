

namespace RSCore.Data.Abstract
{
    public interface IDbSession
    {
        IDbContext Current { get; }

        int SaveChanges();
    }
}
