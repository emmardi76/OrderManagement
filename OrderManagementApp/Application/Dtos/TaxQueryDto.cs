﻿namespace OrderManagementApp.Application.Dtos
{
    public class TaxQueryDto
    {
        public int? Id { get; set; }
        public string? Name { get; set; }
        public decimal? TaxPercentage { get; set; }
    }
}
