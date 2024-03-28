using AutoMapper;
using Common.EntityDto;
using Repository.Entity;
using Repository.Interfaces;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Service.Services
{
    public class CovidDetailsService : IService<CovidDetailsDto>
    {
        private readonly IRepository<CovidDetails> _repository;
        private readonly IMapper mapper;
        public CovidDetailsService(IRepository<CovidDetails> repository, IMapper map)
        {
            this._repository = repository;
            this.mapper = map;
        }
        public async Task<CovidDetailsDto> Add(CovidDetailsDto item)
        {
            return mapper.Map<CovidDetailsDto>(await this._repository.Add(mapper.Map<CovidDetails>(item)));
        }

        public async Task Delete(int id)
        {
            await this._repository.Delete(id);
        }

        public async Task<CovidDetailsDto> Get(int id)
        {
            return mapper.Map<CovidDetailsDto>(await _repository.Get(id));

        }

        public async Task<List<CovidDetailsDto>> GetAll()
        {
            return mapper.Map<List<CovidDetailsDto>>(await _repository.GetAll());
        }

        public async Task<CovidDetailsDto> Put(int id, CovidDetailsDto item)
        {
            return mapper.Map<CovidDetailsDto>(await _repository.Put(id, mapper.Map<CovidDetails>(item)));
        }
    }
}
