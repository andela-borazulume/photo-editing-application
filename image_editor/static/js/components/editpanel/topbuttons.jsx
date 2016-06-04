import React from 'react'
import classNames from 'classnames';
import {connect} from 'react-redux';
import _ from 'lodash';
import {deleteImagefromApi, updateImage} from '../../actions';
import FaceBookApi from '../../api/facebookApi';



class TopButtons extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      editMode: false,
    }
    this.toggleEdit = this.toggleEdit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.resetImage = this.resetImage.bind(this);
    this.shareImage = this.shareImage.bind(this);
    }
    componentWillMount() {
      FaceBookApi.init();
    }

    toggleEdit(){
      this.setState({editMode: !this.state.editMode});
    }
    onSubmit(e){
      e.preventDefault();
      this.setState({editMode: false});
      this.props.updateImage(this.props.activeImage, null, true);
    }
    onChange(e){
      let tempImage = _.clone(this.props.activeImage)
      tempImage.title = e.target.value;
      this.props.updateImage(tempImage)
    }
    resetImage(){
      let tempImage = _.clone(this.props.activeImage)
      tempImage.filtered = false;
      this.props.updateImage(tempImage, null, true);
    }
  shareImage() {
      FaceBookApi.share(this.props.activeImage, this.refs.filteredimage.href);
    }
    render() {
      let buttonClass = classNames({
        btn: true,
        disabled: !this.props.activeImage.picture
      });
      let formCalss = classNames({
        'form-inline': true,
        'hide': !this.state.editMode
      });
        let picture = this.props.activeImage.filtered ?
                this.props.activeImage.filter_path : this.props.activeImage.picture;
      return (
        <div className="edit-buttons">
            <button className={buttonClass} onClick={this.toggleEdit}>
                <span className="mdi mdi-pencil"></span></button>
            <button className={buttonClass} onClick={this.props.deleteImagefromApi.bind(null, this.props.activeImage)}>
                <span className="mdi mdi-delete"></span></button>
            <button className={buttonClass} onClick={this.resetImage}>
                <span className="mdi mdi-backup-restore">
                </span></button>

            <div className="card text-xs-center">
                <blockquote className="card-blockquote card-text">
                    <form
                    className={formCalss}
                    action="#" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <div className="input-group">
                          <input type="text"
                          className="form-control"
                          value={this.props.activeImage.title}
                          onChange={this.onChange}
                          />
                          </div>
                        </div>
                      <button type="submit"
                      className="btn btn-default">
                      Save</button>
                    </form>
                  <h6 className='text-uppercase'>
                  {(this.props.activeImage.title || 'No Image Selected')}
                    </h6>
                  <h6 className="text-uppercase">
                  {
                    (this.props.activeImage.currentFilter ||
                     'No Filter Applied')}
                    </h6>
                </blockquote>

            </div>
            <button className={`${buttonClass} pull-sm-right`} onClick={this.shareImage}>
                <span className="mdi mdi-share-variant">
                </span>
              </button>
            <button className={`${buttonClass} pull-sm-right`}>
             <a ref="filteredimage" href={this.props.activeImage.picture ?
               `/media/${picture}` : '#'}
                download={this.props.activeImage.title}>
            <span className="mdi mdi-download">
            </span></a>
            </button>
          </div>
        );
    }
}

export default connect(null, {deleteImagefromApi, updateImage})(TopButtons);

