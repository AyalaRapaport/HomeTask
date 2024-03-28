using AutoMapper;
using Common.EntityDto;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Internal;
using Repository.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service
{
    class MapperProfile : Profile
    {
        public MapperProfile()
        {
            CreateMap<CovidDetails, CovidDetailsDto>().ReverseMap();               
            CreateMap<Member, MemberDto>().ReverseMap();
            CreateMap<PersonalDetails, PersonalDetailsDto>().ReverseMap();
            CreateMap<Vaccination, VaccinationDto>().ReverseMap();
        }

    }
}
