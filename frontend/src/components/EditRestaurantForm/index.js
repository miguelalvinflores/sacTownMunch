import { useState } from 'react';
import { useDispatch } from "react-redux";
import { updateRestaunt } from '../../store/restaurant'

const EditRestaurantForm = ({ restaurant, hideForm }) => {
  const dispatch = useDispatch();

  const [name, setName] = useState(restaurant.restaurant_name);
  const [address, setAddress] = useState(restaurant.address);
  const [summary, setSummary] = useState(restaurant.summary);
  const [description, setDescription] = useState(restaurant.full_description);

  const updateName = (e) => setName(e.target.value);
  const updateAddress = (e) => setAddress(e.target.value);
  const updateSummary = (e) => setSummary(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...restaurant,
      name,
      address,
      summary,
      description,
    };

    const updatedRestaurant = await dispatch(updateRestaunt(payload));
    if(updatedRestaurant) {
      hideForm();
    }
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  return (
    <section className='edit-restaurant-form-holder'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder="Name"
          required
          value={name}
          onChange={updateName} />
        <input
          type='text'
          placeholder="Address"
          required
          value={address}
          onChange={updateAddress} />
        <input
          type='text'
          placeholder="Summary"
          required
          value={summary}
          onChange={updateSummary} />
        <input
          type='text'
          placeholder="Description"
          required
          value={description}
          onChange={updateDescription} />
        <button type="submit">Update Restaurant</button>
        <button type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default EditRestaurantForm;
