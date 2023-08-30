using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderManagementApp.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ChangedColumNameInOrderAndOrderLine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TaxBase",
                table: "OrderLine",
                newName: "TotalTaxes");

            migrationBuilder.RenameColumn(
                name: "TaxBase",
                table: "Order",
                newName: "TotalTaxes");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "TotalTaxes",
                table: "OrderLine",
                newName: "TaxBase");

            migrationBuilder.RenameColumn(
                name: "TotalTaxes",
                table: "Order",
                newName: "TaxBase");
        }
    }
}
