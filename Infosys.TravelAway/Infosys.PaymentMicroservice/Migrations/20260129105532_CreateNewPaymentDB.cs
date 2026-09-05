using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infosys.PaymentMicroservice.Migrations
{
    /// <inheritdoc />
    public partial class CreateNewPaymentDB : Migration
    {
        private static readonly string[] columns = new[] { "PaymentId", "BookingId", "PaymentStatus", "TotalAmount" };

        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    PaymentId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BookingId = table.Column<int>(type: "int", nullable: false),
                    TotalAmount = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PaymentStatus = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.PaymentId);
                    table.CheckConstraint("chk_PaymentStatus", "PaymentStatus IN ('Confirmed', 'Not Confirmed')");
                });

            migrationBuilder.InsertData(
                table: "Payments",
                columns: columns,
                values: new object[] { 1, 4002, "Confirmed", 200000m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Payments");
        }
    }
}
