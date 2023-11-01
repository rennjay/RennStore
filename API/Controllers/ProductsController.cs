using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API;

[ApiController]
[Route("api/[controller]")]
public class ProductsController : ControllerBase
{
    private readonly StoreContext context;
    private readonly ILogger logger;
    public ProductsController(StoreContext context, ILogger logger)
    {
        this.logger = logger;
        this.context = context;
    }

    [HttpGet]
    public ActionResult<List<Product>> GetProducts()
    {
        var products = context.Products.ToList();
        return Ok(products);
    }
}
