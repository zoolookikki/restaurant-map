import Map from "../components/Map";
import Search from "../components/Search";
import Overlay from "../components/Overlay";

export default function HomePage() {
  return (
    <main>
      <h1>Hello restaurant-map</h1>
      <Map />
      <Search />
      <Overlay />
    </main>
  );
}
