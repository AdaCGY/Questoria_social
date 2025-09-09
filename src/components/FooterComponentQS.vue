<script setup>
    
</script>

<template>
    <div>
 <footer id="footer" class="footer position-relative light-background">

    <div class="container footer-top">
      <div class="row gy-4">
        <div class="col-lg-4 col-md-6 footer-about">
          <a href="index.html" class="logo d-flex align-items-center">
            <span class="sitename">Questoria</span>
          </a>
          <div class="footer-contact pt-3">
            <p>資展國際股份有限公司 205 教室</p>
            <p>台北市, 復興南路1段390 號2樓</p>
            <p class="mt-3"><strong>Phone:</strong> <span>+1 5589 55488 55</span></p>
            <p><strong>Email:</strong> <span>info@example.com</span></p>
          </div>
          <div class="social-links d-flex mt-4">
            <a href=""><i class="bi bi-twitter-x"></i></a>
            <a href=""><i class="bi bi-facebook"></i></a>
            <a href=""><i class="bi bi-instagram"></i></a>
            <a href=""><i class="bi bi-linkedin"></i></a>
          </div>
        </div>

        <div class="col-lg-2 col-md-3 footer-links">
          <h4>Useful Links</h4>
          <ul>
           <li><RouterLink :to="{ path: '/', hash: '#heroQS' }">首頁</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#aboutQS' }">關於我們</RouterLink></li>
  <li><RouterLink :to="{ path: '/', hash: '#contactQS' }">聯絡我們</RouterLink></li>
  <li><router-link :to="{ name: '會員中心' }">會員中心</router-link></li>
  <li><router-link :to="{ name: '購物' }">購物</router-link></li>
  <li><router-link :to="{ name: '任務' }">任務</router-link></li>
          </ul>
        </div>


        <div class="col-lg-4 col-md-12 footer-newsletter">
          <h4>Our Newsletter</h4>
         
          <form action="forms/newsletter.php" method="post" class="php-email-form">
            <div class="newsletter-form"><input type="email" name="email"><input type="submit" value="Subscribe"></div>
            <div class="loading">Loading</div>
            <div class="error-message"></div>
            <div class="sent-message">Your subscription request has been sent. Thank you!</div>
          </form>
        </div>

      </div>
    </div>

    <div class="container copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong class="px-1 sitename">Questoria</strong><span>All Rights Reserved</span></p>
      <div class="credits">
        <!-- All the links in the footer should remain intact. -->
        <!-- You can delete the links only if you've purchased the pro version. -->
        <!-- Licensing information: https://bootstrapmade.com/license/ -->
        <!-- Purchase the pro version with working PHP/AJAX contact form: [buy-url] -->
        Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
      </div>
    </div>

  </footer>

    </div>
</template>

<style lang="scss" scoped>

</style>