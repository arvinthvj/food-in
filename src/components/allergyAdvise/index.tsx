import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { breadcrumbbg,fsalogo,milk,eggs,gluten,soya,peanuts,nuts,lupin,celery,mustard,fish,shellfish,molluscs,so2,sesame} from '../../assets/img';
function AllergyAdvise() {
  return (
    <>
      <div className="breadcrumpset" style={{ backgroundImage: `url(${breadcrumbbg})` }}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="breadcrumpview">
                <h2>Allergy Advise</h2>
                <ul>
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <span>Allergy Advise</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="contact-section">
<div className="container">
<div className="row justify-content-center">
<div className="col-md-10">
<div id="allergiesMainContent" className="content">
<h2 className="mb-3">Allergy Advise</h2>
<div className="row">
<div className="col-12">
<p><img src={fsalogo} />Please note that many of the items on our menu will contain one or more of the allergens listed below. If you have an allergy to any of these, please state your requirements clearly in the cooking instructions box provided in the Options section of the item before adding to your order, or in the Comments box when going through the checkout.<br/>Alternatively, before ordering, please speak to our staff about your requirements on <strong>1800534324242</strong>.</p>
<p>There are 14 major allergens which need to be declared when used as ingredients. The following list tells you what these allergens are and provides some examples of foods where they may be found:</p>
</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center">
<img src={milk} /> <br/>
Milk
</div>
<div className="col-10">This is found in butter, cheese, cream, milk powders and yoghurt. It is often used in foods glazed with milk, powdered soups and sauces.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center">
<img src={eggs} /> <br/>
Eggs
</div>
<div className="col-10">This is often found in cakes, some meat products, mayonnaise, mousses, pasta, quiche, sauces and foods brushed or glazed with egg.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center">
<img src={gluten} /> <br/>
Gluten
</div>
<div className="col-10">This includes wheat (such as spelt and Khorasan wheat/Kamut), rye, barley and oats. It is often found in foods containing flour, such as some baking powders, batter, breadcrumbs, bread, cakes, couscous, meat products, pasta, pastry, sauces, soups and foods dusted with flour.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={soya} /> <br/>
Soya
</div>
<div className="col-10">This can be found in beancurd, edamame beans, miso paste, textured soya protein, soya flour or tofu. It is often used in some desserts, ice cream, meat products, sauces and vegetarian products.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={peanuts} /> <br/>
Peanuts
</div>
<div className="col-10">This can be found in biscuits, cakes, curries, desserts and sauces such as for satay. It is also found in groundnut oil and peanut flour.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={nuts} /> <br/>
Nuts
</div>
<div className="col-10">This includes almonds, hazelnuts, walnuts, cashews, pecan nuts, Brazil nuts, pistachio nuts, macadamia or Queensland nuts. These can be found in breads, biscuits, crackers, desserts, ice cream, marzipan (almond paste), nut oils and sauces. Ground, crushed or flaked almonds are often used in Asian dishes such as curries or stir fries.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={lupin} /> <br/>
Lupin
</div>
<div className="col-10">This includes lupin seeds and flour, and can be found in some types of bread, pastries and pasta.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={celery} /> <br/>
Celery
</div>
<div className="col-10">This includes celery stalks, leaves and seeds and celeriac. It is often found in celery salt, salads, some meat products, soups and stock cubes.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={mustard} /> <br/>
Mustard
</div>
<div className="col-10">This includes liquid mustard, mustard powder and mustard seeds. It is often found in breads, curries, marinades, meat products, salad dressing, sauces and soups.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={fish} /> <br/>
Fish
</div>
<div className="col-10">This is often found in some fish sauces, pizzas, relishes, salad dressings, stock cubes and in Worcestershire sauce.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={shellfish} /> <br/>
Crustaceans
</div>
<div className="col-10">This includes crabs, lobster, prawns and scampi. It is often found in shrimp paste used in Thai curries or salads.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={molluscs} /> <br/>
Molluscs
</div>
<div className="col-10">This includes mussels, land snails, squid and whelks. It is often found in oyster sauce or as an ingredient in fish stews.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={so2} /> <br/>
Sulphur Dioxide
</div>
<div className="col-10">This is often used as a preservative in dried fruit, meat products, soft drinks and vegetables as well as in wine and beer.</div>
</div>
<div className=" row mt-3 justify-content-center">
<div className="col-2 text-center"><img src={sesame} /> <br/>
Sesame Seeds
</div>
<div className="col-10">This can be found in bread, breadsticks, houmous, sesame oil and tahini (sesame paste).</div>
</div>
</div>
</div>
</div>
</div>
</div>
    </>
  );
}

export default AllergyAdvise;
