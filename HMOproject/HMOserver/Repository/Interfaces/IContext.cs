using Repository.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace Repository.Interfaces
{
    public interface IContext
    {    
            public DbSet<CovidDetails> CovidDetails { get; set; }
            public DbSet<Member> Member { get; set; }
            public DbSet<PersonalDetails> PersonalDetails { get; set; }

            public Task save();     
    }
}
