import React from "react";
import {Button} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {GlobalState} from "../config/typesConfig.ts";
import {connect} from "react-redux";
import {AppDispatch} from "../redux/store.ts";
import {fetchFilmsList} from "../redux/lastSearchSlice.ts";

type Props = {
    search: (pattern: string) => void,
    loading: boolean,
    pattern: string
}

class Form extends React.Component<Props> {

    state = {
        inputNameValue: ""
    };

    componentDidMount() {
        if (this.props.pattern !== "") {
            this.setState({inputNameValue: this.props.pattern})
        }
    }

    onChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({inputNameValue: e.target.value});
    }

    render() {
        return (
            <div className="d-flex gap-2">
                <input className="filter" name="searchText" value={this.state.inputNameValue}
                       onChange={this.onChangeInput.bind(this)}/>
                <Button variant="warning" onClick={() => this.props.search(this.state.inputNameValue)}
                        disabled={this.props.loading}>
                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                </Button>
            </div>
        )
    }
}

const mapStateToProps = (state: GlobalState) => {
    return {loading: state.lastSearch.loading};
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        search: (pattern: string) => dispatch(fetchFilmsList(pattern))
    };
};
// eslint-disable-next-line
export default connect(mapStateToProps, mapDispatchToProps)(Form);