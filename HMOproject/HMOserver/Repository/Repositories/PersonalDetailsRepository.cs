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
    public class PersonalDetailsRepository:IRepository<PersonalDetails>
    {
        private readonly IContext _context;
        public PersonalDetailsRepository(IContext context)
        {
            _context = context;
        }
        public async Task<PersonalDetails> Add(PersonalDetails item)
        {
            await _context.PersonalDetails.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            _context.PersonalDetails.Remove(await Get(id));
            await _context.save();
        }

        public async Task<PersonalDetails> Get(int id)
        {
            return await _context.PersonalDetails.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<PersonalDetails>> GetAll()
        {
            return await _context.PersonalDetails.ToListAsync();
        }

        public async Task<PersonalDetails> Put(int id, PersonalDetails item)
        {
            PersonalDetails PersonalDetails = await Get(id);
            PersonalDetails.FirstName = item.FirstName;
            PersonalDetails.LastName = item.LastName;
            PersonalDetails.City = item.City;
            PersonalDetails.Street = item.Street;
            PersonalDetails.Number = item.Number;
            PersonalDetails.DateOfBirth = item.DateOfBirth;
            PersonalDetails.PhoneNumber = item.PhoneNumber;
            PersonalDetails.MobileNumber = item.MobileNumber;
            if (item.UrlProfileImg!=null)
            PersonalDetails.UrlProfileImg = item.UrlProfileImg;
            else item.UrlProfileImg = PersonalDetails.UrlProfileImg;
            await _context.save();
            return item;
        }
    }
}
