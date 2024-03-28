using Common.EntityDto;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HMO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CovidDetailsController : ControllerBase
    {
        private readonly IService<CovidDetailsDto> service;
        public CovidDetailsController(IService<CovidDetailsDto> service)
        {
            this.service = service;
        }
        // GET: api/<CovidDetailsController>
        [HttpGet]
        public async Task<List<CovidDetailsDto>> Get()
        {
            return await service.GetAll();
        }

        // GET api/<CovidDetailsController>/5
        [HttpPost("{id}")]
        public async Task<CovidDetailsDto> Get(int id)
        {
            return await service.Get(id);
        }

        // POST api/<CovidDetailsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CovidDetailsDto covidDetailsDto)
        {
            return Ok(await service.Add(covidDetailsDto));
        }

        // PUT api/<CovidDetailsController>/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CovidDetailsDto covidDetailsDto)
        {
            return Ok(await service.Put(id,covidDetailsDto));
        }

        // DELETE api/<CovidDetailsController>/5
        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
             await service.Delete(id);
        }
    }
}
