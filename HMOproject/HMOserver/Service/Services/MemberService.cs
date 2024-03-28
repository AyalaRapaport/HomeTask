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
    public class MemberService:IService<MemberDto>
    {
        private readonly IRepository<Member> _repository;
        private readonly IMapper mapper;
        public MemberService(IRepository<Member> repository, IMapper map)
        {
            this._repository = repository;
            this.mapper = map;
        }
        public async Task<MemberDto> Add(MemberDto item)
        {
            return mapper.Map<MemberDto>(await this._repository.Add(mapper.Map<Member>(item)));
        }

        public async Task Delete(int id)
        {
            await this._repository.Delete(id);
        }

        public async Task<MemberDto> Get(int id)
        {
            return mapper.Map<MemberDto>(await _repository.Get(id));

        }

        public async Task<List<MemberDto>> GetAll()
        {
            return mapper.Map<List<MemberDto>>(await _repository.GetAll());
        }

        public async Task<MemberDto> Put(int id, MemberDto item)
        {
            return mapper.Map<MemberDto>(await _repository.Put(id, mapper.Map<Member>(item)));
        }
    }
}
