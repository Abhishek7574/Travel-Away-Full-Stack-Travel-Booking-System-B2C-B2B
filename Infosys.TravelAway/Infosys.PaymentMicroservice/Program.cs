
using Infosys.PaymentMicroservice.Models;
using Infosys.PaymentMicroservice.Repository;

namespace Infosys.PaymentMicroservice
{
    public static class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddTransient<PaymentDBContext>();
            builder.Services.AddTransient<PaymentRepository>(
                        c => new PaymentRepository(c.GetRequiredService<PaymentDBContext>()));


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();
            app.UseCors(option => option.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());


            app.MapControllers();

            app.Run();
        }
    }
}
