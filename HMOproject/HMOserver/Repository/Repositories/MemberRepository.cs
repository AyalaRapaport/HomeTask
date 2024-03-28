using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class MemberRepository:IRepository<Member> 
    {
        private readonly IContext _context;
        public MemberRepository(IContext context)
        {
            _context = context;
        }
        public async Task<Member> Add(Member item)
        {
            await _context.Member.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            _context.Member.Remove(await Get(id));
            await _context.save();
        }

        public async Task<Member> Get(int id)
        {
            return await _context.Member.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Member>> GetAll()
        {
            return await _context.Member.ToListAsync();
        }

        public async Task<Member> Put(int id, Member item)
        {
            Member Member = await Get(id);
            Member.PersonalInfo = item.PersonalInfo;
            Member.CovidInfo = item.CovidInfo;
            await _context.save();
            return item;
        }
    }
}
