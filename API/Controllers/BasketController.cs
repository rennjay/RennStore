using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;

        }
        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            Basket basket = await RetriveBasket();

            if (basket == null) return NotFound();

            return basket;
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
        {
            // get basket
            var basket = await RetriveBasket();
            // create basket if none
            if (basket is null)
            {
                basket = CreateBasket();
            }
            // get product
            var product = await _context.Products.FindAsync(productId);
            if (product is null)
            {
                return NotFound();
            }
            // add item
            basket.AddItem(product, quantity);
            var result = await _context.SaveChangesAsync() > 0;
            if (result)
            {
                return CreatedAtAction("AddItemToBasket", basket);
            }

            return BadRequest(new ProblemDetails { Title = "Problem saving item to basket" });
        }

        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int id, int quantity)
        {
            // get basket
            var basket = await _context.Baskets.FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
            if (basket is null)
            {
                return BadRequest(new ProblemDetails { Title = "Basket does not exists" });
            }

            basket.RemoveItem(id, quantity);
            await _context.SaveChangesAsync();
            return Ok();
        }

        private async Task<Basket> RetriveBasket()
        {
            return await _context.Baskets
            .Include(i => i.Items)
            .ThenInclude(p => p.Product)
            .FirstOrDefaultAsync(b => b.BuyerId == Request.Cookies["buyerId"]);
        }
        private Basket CreateBasket()
        {
            var buyerId = Guid.NewGuid().ToString();
            var cookieOptions = new CookieOptions
            {
                IsEssential = true,
                Expires = DateTime.Now.AddDays(30)
            };
            Response.Cookies.Append("buyerId", buyerId, cookieOptions);
            var basket = new Basket { BuyerId = buyerId };
            _context.Baskets.AddAsync(basket);
            return basket;
        }
    }
}