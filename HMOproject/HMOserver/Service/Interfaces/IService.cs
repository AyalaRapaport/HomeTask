using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Interfaces
{
    public interface IService<T> where T : class
    {
        public Task<T> Add(T item);
        public Task<T> Put(int id, T item);
        public Task Delete(int id);
        public Task<T> Get(int id);
        public Task<List<T>> GetAll();
    }
}
