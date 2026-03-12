var builder = WebApplication.CreateBuilder(args);

// ----------------------
// Configure Umbraco
// ----------------------
builder.CreateUmbracoBuilder()
       .AddBackOffice()
       .AddWebsite()
       .AddComposers()
       .AddDeliveryApi()
       .Build();


// ----------------------
// Add CORS for frontend
// ----------------------
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost3000", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// ----------------------
// Boot Umbraco
// ----------------------
await app.BootUmbracoAsync();

// ----------------------
// Enable CORS
// ----------------------
app.UseCors("AllowLocalhost3000");

// ----------------------
// Configure Umbraco Middleware & Endpoints
// ----------------------
app.UseUmbraco()
   .WithMiddleware(u =>
   {
       u.UseBackOffice();
       u.UseWebsite();
   })
   .WithEndpoints(u =>
   {
       u.UseBackOfficeEndpoints();
       u.UseWebsiteEndpoints();
   });

// ----------------------
// Run the application
// ----------------------
await app.RunAsync();