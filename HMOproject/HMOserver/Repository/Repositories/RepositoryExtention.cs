using Microsoft.Extensions.DependencyInjection;
using Repository.Entity;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Formats.Asn1.AsnWriter;

namespace Repository.Repositories
{
    public static class RepositoryExtention
    {
        public static IServiceCollection AddRepository(this IServiceCollection services)
        {
            services.AddScoped(typeof(IRepository<Member>), typeof(MemberRepository));        
            services.AddScoped(typeof(IRepository<PersonalDetails>), typeof(PersonalDetailsRepository));        
            services.AddScoped(typeof(IRepository<CovidDetails>), typeof(CovidDetailsRepository));        
            return services;
        }
    }
}
