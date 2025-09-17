<template>
  <footer class="site-footer">
    <div class="footer-container">
      <p>© 2025 Questoria. All rights reserved.</p>
      <div class="footer-links">
        <router-link to="/privacy">隱私權政策</router-link>
        <router-link to="/terms">使用條款</router-link>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--bg-color, #fff);
  border-top: 1px solid #e0e0e0;
  padding: 1rem 2rem;
  font-size: 0.9rem;
  color: var(--text-color, #666);
  text-align: center;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  max-width: 1200px;
  margin: auto;
}

.footer-links a {
  margin-left: 1rem;
  color: var(--text-color, #666);
  text-decoration: none;
}

.footer-links a:hover {
  color: var(--primary-color, #e60012);
}

.site-footer {
  background-color: var(--footer-bg);
  color: var(--footer-text);
  padding: 2rem 1rem;
  text-align: center;
  font-size: 0.9rem;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.footer-links a {
  color: var(--footer-link);
  margin: 0 0.5rem;
  text-decoration: none;
}
.footer-links a:hover {
  text-decoration: underline;
}

</style>