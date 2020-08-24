import React, { Component } from "react";
import "../../../css/components/Footer/Footer.css";

export default class Footer extends Component {
  render() {
    return (
      <div style={{background:"linear-gradient(to left, #333399 0%, #0099cc 100%)"}}>
        <div class="mt-5 pt-5 pb-5 footer">
          <div class="container">
            <div class="row">
              <div class="col-lg-5 col-xs-12 about-company">
                <h2>Rentickly</h2>
               
              </div>
              <div class="col-lg-3 col-xs-12 links">
                <h4 class="mt-lg-0 mt-sm-3">Pages</h4>
                <ul class="m-0 p-0">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/construction">Advertiser</a>
                  </li>
                  <li>
                    <a href="/construction">Favourite</a>
                  </li>
                  <li>
                    <a href="/faq">FAQ</a>
                  </li>
                  <li>
                    <a href="/construction">Chat</a>
                  </li>
                  <li>
                    <a href="/login">Login</a>
                  </li>
                </ul>
              </div>
              <div class="col-lg-4 col-xs-12 location">
                <h4 class="mt-lg-0 mt-sm-4">Location</h4>
                <p>22, south park street</p>
                <p class="mb-0">
                  <i class="fa fa-phone mr-3"></i>(541) 754-3010
                </p>
                <p>
                  <i class="fa fa-envelope-o mr-3"></i>info@hsdf.com
                </p>
              </div>
            </div>
            <div class="row mt-5">
              <div class="col copyright">
                <p class="">
                  <small class="text-white-50">
                    © 2020. All Rights Reserved.
                  </small>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
