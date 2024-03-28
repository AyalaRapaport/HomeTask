using Microsoft.Extensions.DependencyInjection;
using Service.Interfaces;
using Repository.Repositories;
using Common.EntityDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public static class ServiceExtention
    {
        public static IServiceCollection AddServices(this IServiceCollection services)
        {
            services.AddRepository();
            services.AddScoped(typeof(IService<MemberDto>), typeof(MemberService));
            services.AddScoped(typeof(IService<PersonalDetailsDto>), typeof(PersonalDetailsService));
            services.AddScoped(typeof(IService<CovidDetailsDto>), typeof(CovidDetailsService));       
            services.AddAutoMapper(typeof(MapperProfile));
            return services;
        }
    }
}
