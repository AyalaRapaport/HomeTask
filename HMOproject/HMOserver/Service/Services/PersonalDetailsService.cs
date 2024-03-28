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
    public class PersonalDetailsService:IService<PersonalDetailsDto>
    {
        private readonly IRepository<PersonalDetails> _repository;
        private readonly IMapper mapper;
        public PersonalDetailsService(IRepository<PersonalDetails> repository, IMapper map)
        {
            this._repository = repository;
            this.mapper = map;
        }
        public async Task<PersonalDetailsDto> Add(PersonalDetailsDto item)
        {
            return mapper.Map<PersonalDetailsDto>(await this._repository.Add(mapper.Map<PersonalDetails>(item)));
        }

        public async Task Delete(int id)
        {
            await this._repository.Delete(id);
        }

        public async Task<PersonalDetailsDto> Get(int id)
        {
            return mapper.Map<PersonalDetailsDto>(await _repository.Get(id));

        }

        public async Task<List<PersonalDetailsDto>> GetAll()
        {
            return mapper.Map<List<PersonalDetailsDto>>(await _repository.GetAll());
        }

        public async Task<PersonalDetailsDto> Put(int id, PersonalDetailsDto item)
        {
            return mapper.Map<PersonalDetailsDto>(await _repository.Put(id, mapper.Map<PersonalDetails>(item)));
        }
    }
}
