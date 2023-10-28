import SearchBar from "../../components/SearchBar";

type Props = {};

const Header = (props: Props) => {
  return (
    <div className="bg-gradient-to-r to-[#5f6984] from-[#0f1f47] p-2">
      <SearchBar />
    </div>
  );
};

export default Header;
