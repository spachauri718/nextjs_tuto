export default function userProfile({params}:any) {
  return (
    <div>
      <h1>profile page </h1>
      <p>{params.id}</p>
    </div>
  );
}
