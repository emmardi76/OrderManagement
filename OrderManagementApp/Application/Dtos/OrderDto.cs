﻿using OrderManagementApp.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OrderManagementApp.Application.Dtos
{
    public class OrderDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public int CustomerAddressId { get; set; }
        public DateTime Date { get; set; }
        public string? OrderNumber { get; set; }
        public string? Remarks { get; set; }
        public decimal TotalWithoutTaxes { get; set; }
        public decimal Total { get; set; }
        public decimal TotalTaxes { get; set; }        
    }
}
