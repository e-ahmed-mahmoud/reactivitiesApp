using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();         //store host in variable to and not direct Run server 

             //load DI from host.server function and define new scope these scope will end and dipose when Main method end
            using var scope = host.Services.CreateScope();     
            
            var services = scope.ServiceProvider;           //reference all DI services to get DbContext service

            try
            {
                 var context = services.GetRequiredService<DataContext>();      //load DbContext from services
                
                await context.Database.MigrateAsync();                 //load any migration to Database and create it if not defined
                await Seed.SeedData(context);
            }
            catch (Exception ex)
            {
                var logger = services.GetRequiredService<ILogger<Program>>();   //load logger from services at error
                logger.LogError(ex , "error occurs");           //print logger msg to user
            }
            await host.RunAsync();             //run host server
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
