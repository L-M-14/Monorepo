type HeaderProps = {
  title: string;
  showParagraph?: boolean;
};

const Header = ({ title, showParagraph = false }: HeaderProps) => {
  return (
    <div className="text-primary text-4xl m-10 text-center">
      <h1 className="m-5">{title}</h1>
      {showParagraph && (
        <p className="text-3xl">Créez une liste de séries qui vous ressemble</p>
      )}
    </div>
  );
};

export default Header;
