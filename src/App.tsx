import "./App.css";

/* components */
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />

      <div className="px-4 bg-(--secondary-color) text-white">
        <main className="md:max-w-5xl mx-auto py-6">
          TEST
          <section className="py-4 md:py-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
            iure perferendis debitis similique tenetur accusamus, laborum itaque
            autem sapiente facere aut natus, cupiditate sint tempore quisquam
            asperiores sequi error excepturi.
          </section>
          <section className="grid md:grid-cols-2 gap-4">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, qui,
              saepe iure dolor omnis ipsum dolore quidem molestiae libero
              voluptates at excepturi voluptate, fugit officia rem repellendus?
              Recusandae, asperiores est?
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea, qui,
              saepe iure dolor omnis ipsum dolore quidem molestiae libero
              voluptates at excepturi voluptate, fugit officia rem repellendus?
              Recusandae, asperiores est?
            </p>
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
