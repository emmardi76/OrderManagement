using AutoMapper;
using OrderManagementApp.Application.Dtos;
using OrderManagementApp.Application.Services.ServiceInterfaces;
using OrderManagementApp.Domain.Entities;
using OrderManagementApp.Domain.Interfaces;

namespace OrderManagementApp.Application.Services
{
    public class TaxTypeService : ITaxTypeService
    {
        private readonly ITaxTypeRepository _taxTypeRepository;
        private readonly IMapper _mapper;

        public TaxTypeService(ITaxTypeRepository taxTypeRepository, IMapper mapper)
        {
            _taxTypeRepository = taxTypeRepository;
            _mapper = mapper;
        }

        public async Task<TaxTypeDto> CreateTax(TaxTypeDto taxTypeDto)
        {
            var itemTax = await _taxTypeRepository.GetTaxTypeById(taxTypeDto.Id);

            if (itemTax != null)
            {
                
                throw new InvalidOperationException("The TaxType already exists");
            }

            var Tax = _mapper.Map<TaxType>(taxTypeDto);
            _taxTypeRepository.CreateTaxType(Tax);
            await _taxTypeRepository.Save();
            return _mapper.Map<TaxTypeDto>(Tax);
        }

        public async Task DeleteTax(int id)
        {
            var Tax = await _taxTypeRepository.GetTaxTypeById(id);

            if (Tax == null)
            {
                throw new InvalidOperationException($"The TaxType with id {id} does not exist.");
            }

            _taxTypeRepository.DeleteTaxType(Tax);

            await _taxTypeRepository.Save();
        }

        public async Task<ICollection<TaxTypeDto>> GetTaxes(TaxQueryDto taxQueryDto)
        {
            var ListTaxes = await _taxTypeRepository.GetAll(taxQueryDto);
            return _mapper.Map<List<TaxTypeDto>>(ListTaxes);
        }

        public async Task<TaxTypeDto> UpdateTax(TaxTypeDto taxesDto)
        {
            var Tax = await _taxTypeRepository.GetTaxTypeById(taxesDto.Id);

            if (Tax == null)
            {
                throw new InvalidOperationException($"The TaxType with id {taxesDto.Id} does not exist.");
            }

            _mapper.Map(taxesDto, Tax);
            await _taxTypeRepository.Save();

            return _mapper.Map<TaxTypeDto>(Tax); 
        }
    }
}
