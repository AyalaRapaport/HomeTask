using Microsoft.EntityFrameworkCore;
using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataContext
{
    public class Db : DbContext, IContext
    {
        public DbSet<CovidDetails> CovidDetails { get; set; }
        public DbSet<PersonalDetails> PersonalDetails { get; set; }
        public DbSet<Member> Member { get; set; }

        public async Task save()
        {
            await SaveChangesAsync();
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=WIN-ADMIN1\\MSSQLSERVEROK;Database=hmoDb;Trusted_Connection=True;");

            //optionsBuilder.UseSqlServer("Server=WIN-ADMIN1\\MSSQLSERVEROK;Database=hmo3;Trusted_Connection=True;");
        }
    }
}
