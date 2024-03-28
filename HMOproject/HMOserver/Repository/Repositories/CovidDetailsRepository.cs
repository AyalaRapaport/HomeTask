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
    public class CovidDetailsRepository : IRepository<CovidDetails>
    {
        private readonly IContext _context;
        public CovidDetailsRepository(IContext context)
        {
            _context = context;
        }
        public async Task<CovidDetails> Add(CovidDetails item)
        {
            await _context.CovidDetails.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task Delete(int id)
        {
            _context.CovidDetails.Remove(await Get(id));
            await _context.save();
        }

        public async Task<CovidDetails> Get(int id)
        {
            return await _context.CovidDetails.Include(v => v.Vaccinations).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<CovidDetails>> GetAll()
        {
            return await _context.CovidDetails.Include(v => v.Vaccinations).ToListAsync();
        }

        public async Task<CovidDetails> Put(int id, CovidDetails item)
        {
            CovidDetails covidDetails = await Get(id);
            covidDetails.PositiveResultDate = item.PositiveResultDate;
            covidDetails.RecoveryDate = item.RecoveryDate;
            if (item.Vaccinations.Count != 0)
            {
                Vaccination vaccination = new Vaccination();
                vaccination.VaccinationDate = item.Vaccinations.ElementAtOrDefault(item.Vaccinations.Count - 1).VaccinationDate;
                vaccination.VaccineManufacturer = item.Vaccinations.ElementAtOrDefault(item.Vaccinations.Count - 1).VaccineManufacturer;
                covidDetails.Vaccinations.Add(vaccination);

            }
            await _context.save();
            return item;
        }
    }
}
